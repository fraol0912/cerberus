import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";

export default (pkg) => {
  return {
    input: "src/main.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
      },
      {
        file: pkg.module,
        format: "es",
      },
    ],
    external: [...Object.keys(pkg.dependencies || {})],
    plugins: [
      typescript({
        cacheRoot: ".rollup.cache",
        tsconfig: "./tsconfig-build.json",
      }),
      terser(),
    ],
  };
};
