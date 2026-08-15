import { defineConfig } from 'wxt';

export default defineConfig({
  modules: ['@wxt-dev/auto-icons'],
  manifest: {
    name: "RickRollProtector",
    developer: {
      name: "fab3F",
      url: "https://fab3F.github.io"
    },
    default_locale: "en",
    description: "__MSG_manifestDesc__",
    permissions: ["storage"],
    browser_specific_settings: {
      gecko: {
        id: "rickrollprotector@fab3F.github.io",
        data_collection_permissions: {
          required: ["none"],
        },
      }
    },
    web_accessible_resources: [{
      resources: ["error.html"],
      matches: ["*://*.youtube.com/*"]
    }]
  },
});