import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/auto-icons'],
  manifest: {
    name: "RickRollProtector",
    author: {
      email: "fab3F@programmer.net"
    },
    developer: {
      name: "fab3F",
      url: "https://fab3F.github.io"
    },
    version: "2.0.0.0",
    default_locale: "en",
    description: "__MSG_manifestDesc__",
    permissions: ["storage"],
    browser_specific_settings: {
      gecko: {
        id: "rickrollprotector@fab3F.github.io"
      }
    },
    web_accessible_resources: [{
      resources: ["error.html"],
      matches: ["*://*.youtube.com/*"]
    }]
  },
});