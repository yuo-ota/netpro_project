import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: { value: "#0000ff" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);