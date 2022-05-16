import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Select,
  Tooltip,
} from "@chakra-ui/react";
import { Form, FormikErrors, FormikProps, withFormik } from "formik";
import React, { FC } from "react";
import { Clothing, ClothingType } from "../../types/clothing";
import { CLOTHING_MAX_TEMP, CLOTHING_MIN_TEMP } from "../../utils/clothing";

export type ClothingFormValues = {
  name?: string;
  type?: ClothingType;
  rainproof?: boolean;
  windproof?: boolean;
  clearWeather?: boolean;
  tempRange?: number[];
};

type ClothingFormProps = {
  clothing?: ClothingFormValues;
  clothingOptions: Record<string, Clothing>;
};

type InnerClothingFormProps = FormikProps<ClothingFormValues>;

const InnerClothingForm: FC<InnerClothingFormProps> = ({
  touched,
  errors,
  isSubmitting,
  getFieldProps,
  setFieldValue,
}) => {
  const minRangeText = () => {
    const value = getFieldProps("tempRange").value[0];
    return value === CLOTHING_MIN_TEMP ? "-" : String(value);
  };

  const maxRangeText = () => {
    const value = getFieldProps("tempRange").value[1];
    return value === CLOTHING_MAX_TEMP ? "+" : String(value);
  };

  return (
    <Form>
      {/* Name */}
      <FormControl isInvalid={!!(errors.name && touched.name)}>
        <FormLabel htmlFor="name">Name</FormLabel>
        <Input {...getFieldProps("name")} id="name" placeholder="name" />
        <FormErrorMessage>{errors.name}</FormErrorMessage>
      </FormControl>

      {/* Clothing Type */}
      <FormControl isInvalid={!!(errors.type && touched.type)}>
        <FormLabel htmlFor="type">Type</FormLabel>
        <Select {...getFieldProps("type")} id="type">
          <option key={"none"} value={undefined}>
            Select type
          </option>
          {Object.keys(ClothingType)
            .filter((key) => isNaN(Number(key)))
            .map((type) => (
              <option key={type}>{type}</option>
            ))}
        </Select>
        <FormErrorMessage>{errors.type}</FormErrorMessage>
      </FormControl>

      {/* Rainproof / Windproof */}
      <FormControl>
        <FormLabel htmlFor="rainproof">Rainproof 🌧️</FormLabel>
        <Checkbox
          {...getFieldProps("rainproof")}
          defaultChecked={getFieldProps("rainproof").value}
          id="rainproof"
        />
        <FormErrorMessage>{errors.rainproof}</FormErrorMessage>
        <FormLabel htmlFor="windproof">Windproof 💨</FormLabel>
        <Checkbox
          {...getFieldProps("windproof")}
          defaultChecked={getFieldProps("windproof").value}
          id="windproof"
        />
        <FormErrorMessage>{errors.windproof}</FormErrorMessage>
      </FormControl>

      {/* Temperature Range */}
      <FormControl isInvalid={!!(errors.tempRange && touched.tempRange)}>
        <FormLabel htmlFor="tempRange">Temperature Range</FormLabel>
        <RangeSlider
          id="tempRange"
          min={CLOTHING_MIN_TEMP}
          max={CLOTHING_MAX_TEMP}
          step={1}
          {...getFieldProps("tempRange")}
          onChange={(value) => {
            setFieldValue("tempRange", value);
            return;
          }}
        >
          <RangeSliderTrack bg="red.100">
            <RangeSliderFilledTrack bg="tomato" />
          </RangeSliderTrack>
          <Tooltip label={minRangeText()} hasArrow placement="top">
            <RangeSliderThumb boxSize={6} index={0}>
              <Box>{minRangeText()}</Box>
            </RangeSliderThumb>
          </Tooltip>
          <Tooltip label={maxRangeText()} hasArrow placement="top">
            <RangeSliderThumb boxSize={6} index={1}>
              {maxRangeText()}
            </RangeSliderThumb>
          </Tooltip>
        </RangeSlider>
        <FormErrorMessage>{errors.tempRange}</FormErrorMessage>
      </FormControl>

      <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
        Save
      </Button>
    </Form>
  );
};

const validateName = (name: string) => {
  if (name.length < 3) return "Minimum length is 3";
  if (name.length > 20) return "Maximum length is 20";
  if (!name.match("[A-zA-zÆØÅæøå]{3,10}")) return "Invalid characters";
  return null;
};

const validateType = (type: ClothingType) => {
  return null;
};

const validateTemp = (
  minTemp: number | undefined,
  maxTemp: number | undefined
) => {
  if (
    typeof minTemp === "number" &&
    typeof maxTemp === "number" &&
    minTemp >= maxTemp
  ) {
    return "MaxTemp must be larger than MinTemp";
  }

  return null;
};

const generateClothingForm = (
  handleSubmit: (values: ClothingFormValues) => void
) =>
  withFormik<ClothingFormProps, ClothingFormValues>({
    mapPropsToValues: (props) => {
      const { clothing } = props;
      return {
        ...{
          name: clothing?.name ?? undefined,
          type: clothing?.type ?? undefined,
          rainproof: clothing?.rainproof ?? false,
          windproof: undefined,
          tempRange: [CLOTHING_MIN_TEMP, CLOTHING_MAX_TEMP],
        },
        ...clothing,
      };
    },
    validate: (values: ClothingFormValues) => {
      const errors: FormikErrors<ClothingFormValues> = {};

      let errorMessage;

      // Name
      if (!values.name) errors.name = "Required";
      else {
        errorMessage = validateName(values.name);
        if (errorMessage) errors.name = errorMessage;
      }

      // Clothing Type
      if (!values.type) errors.type = "Required";
      else {
        errorMessage = validateType(values.type);
        if (errorMessage) errors.type = errorMessage;
      }

      if (!values.tempRange) errors.tempRange = "MaxTemp or MinTemp required";
      else {
        const [minTemp, maxTemp] = values.tempRange;

        // Temperature Range
        if (typeof minTemp !== "number" && typeof maxTemp !== "number")
          errors.tempRange = "MaxTemp or MinTemp required";
        else {
          errorMessage = validateTemp(minTemp, maxTemp);
          if (errorMessage) errors.tempRange = errorMessage;
        }
      }

      return errors;
    },
    handleSubmit,
  })(InnerClothingForm);

export default generateClothingForm;
