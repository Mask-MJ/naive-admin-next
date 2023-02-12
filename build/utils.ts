export interface ViteEnv {
  VITE_PORT: number;
  VITE_PUBLIC_PATH: string;
  VITE_PROXY: [string, string][];
  VITE_GLOB_APP_TITLE: string;
  VITE_GLOB_APP_SHORT_NAME: string;
  VITE_DROP_CONSOLE: boolean;
}

export const wrapperEnv = (envConf: Record<string, any>): ViteEnv => {
  const viteEnv: Partial<ViteEnv> = {};

  for (const key of Object.keys(envConf)) {
    let realname = envConf[key].replace(/\\n/g, '\n');
    realname = realname === 'true' ? true : realname === 'false' ? false : realname;
    if (key === 'VITE_PORT') {
      realname = Number(realname);
    }
    if (key === 'VITE_PROXY' && realname) {
      try {
        realname = JSON.parse(realname.replace(/'/g, '"'));
      } catch (error) {
        realname = '';
      }
    }

    viteEnv[key] = realname;
    if (typeof realname === 'string') {
      process.env[key] = realname;
    } else if (typeof realname === 'object') {
      process.env[key] = JSON.stringify(realname);
    }
  }
  return viteEnv as ViteEnv;
};

/**
 * Get the configuration file variable name
 * @param env
 */
export const getConfigFileName = (env: Record<string, any>) => {
  return `__PRODUCTION__${env.VITE_GLOB_APP_SHORT_NAME || '__APP'}__CONF__`
    .toUpperCase()
    .replace(/\s/g, '');
};
