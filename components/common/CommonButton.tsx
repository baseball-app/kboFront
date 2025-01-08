import { theme } from "@/constants/Colors";
import { forwardRef } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
} from "react-native";

/** 버튼 공통 컴포넌트 인터페이스 */
interface ICommonButton extends React.ComponentProps<typeof TouchableOpacity> {
  title: string;
  color?: ButtonColor;
  variant?: ButtonVariant;
  buttonStyleProps?: ViewStyle | ViewStyle[];
  textStyleProps?: TextStyle | TextStyle[];
}

/** 버튼 색상, 유형 타입 */
type ButtonColor = "primary" | "secondary" | string;
type ButtonVariant = "solid" | "outlined";

/** 공통 버튼 컴포넌트 */
const CommonButton = forwardRef<TouchableOpacity, ICommonButton>(
  (
    {
      onPress,
      title,
      disabled,
      variant = "solid",
      textStyleProps,
      buttonStyleProps,
      color = theme.buttonColors.primary,
      ...rest
    },
    ref
  ) => {
    const colorStyle = getColorStyle(color);
    /** 버튼 스타일 */
    const buttonStyles = [
      styles.baseButton,
      variant && variantStyles[variant](colorStyle),
      disabled && styles.disabledButton,
      buttonStyleProps,
    ];
    /** 글자 스타일 */
    const textStyles = [
      styles.baseText,
      textColorStyles[variant](colorStyle),
      disabled && styles.disabledText,
      textStyleProps,
    ];
    return (
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        style={buttonStyles}
        disabled={disabled}
        {...rest}
      >
        <Text style={textStyles}>{title}</Text>
      </TouchableOpacity>
    );
  }
);
/** 색상 스타일 반환 */
const getColorStyle = (pColor: ButtonColor): string => {
  const colorMap: Record<string, string> = {
    primary: theme.buttonColors.primary,
    secondary: theme.buttonColors.secondary,
  };
  return colorMap[pColor] || pColor;
};

/** 변형 스타일 매핑 */
const variantStyles: Record<ButtonVariant, (color: string) => ViewStyle> = {
  solid: (color) => ({ backgroundColor: color }),
  outlined: (color) => ({
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: color,
  }),
};

/** 텍스트 색상 매핑 */
const textColorStyles: Record<ButtonVariant, (color: string) => TextStyle> = {
  solid: () => ({ color: theme.buttonColors.white }),
  outlined: (color) => ({ color }),
};
const styles = StyleSheet.create({
  baseButton: {
    borderRadius: 10,
  },
  baseText: {
    fontSize: 16,
    textAlign: "center",
    fontWeight: "600",
  },
  disabledButton: {
    backgroundColor: theme.buttonColors.disabled,
  },
  disabledText: {
    color: "#77756C",
  },
});

export default CommonButton;
