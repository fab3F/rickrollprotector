![Known Rickrolls](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Ffab3f.github.io%2Frickrollprotector%2Fstats.json&query=%24.blockedLinks&label=Known%20Rickrolls&color=success&logo=shield)
[![`[Discord]`](https://img.shields.io/discord/824334386786074634.svg?label=&logo=discord&logoColor=ffffff&color=7389D8&labelColor=6A7EC2)](https://fab3F.github.io/link/discord)
[![`[GitHub]`](https://img.shields.io/badge/GitHub_fab3F-171515?style=flat&logo=github&labelColor=000000)](https://fab3F.github.io/link/github)
[![Release & Upload Extension](https://github.com/fab3F/rickrollprotector/actions/workflows/release.yml/badge.svg)](https://github.com/fab3F/rickrollprotector/actions/workflows/release.yml)
[![Deploy Website & Stats](https://github.com/fab3F/rickrollprotector/actions/workflows/deploy.yml/badge.svg)](https://github.com/fab3F/rickrollprotector/actions/workflows/deploy.yml)

# RickRollProtector

Never get Rickrolled again! 

**RickRollProtector** is a lightweight browser extension that automatically detects and intercepts known Rickroll links on YouTube, warning you before the video even starts playing. Visit the [official website](https://fab3F.github.io/rickrollprotector) for more detailed information.

If you found a new Rickroll link that slipped through our detection, please help us keep the database up to date by sending it to **fab3F@programmer.net**. Thank you!

Made by fab3F.

## Installation

You can install the extension directly from the official add-on stores for your browser:

* **Firefox:** Download it from [Firefox Add-ons](https://addons.mozilla.org/de/firefox/addon/rickrollprotector/).
* **Google Chrome:** Download it from the [Chrome Web Store](https://chromewebstore.google.com/detail/canjopdiolhgekkdoibphhiggfdphhco).

*(Alternatively, you can manually download the latest `.xpi` or `.zip` files from our GitHub Releases page).*

## Help & Contact

Do you have any issues with the extension, want to report a bug, or just have a general question? 

* Join the [EasyFlick Discord](https://fab3f.github.io/link/discord) and ask in the dedicated support channel.
* Or shoot an email directly to **fab3F@programmer.net**.

---

## Developer Note: Release Instructions

This is how the GitHub Actions workflow utilizes the description and title in the Git commands for an automated release (Example for version 2.1.0):

```bash
git commit -m "COMMIT TITLE"

git tag -a v2.1.0 -m "<RELEASE TITLE>" -m "- Fixed and optimized communication with Website" -m "LINE 2" -m "LINE 3"
# eg <RELEASE TITLE> = "v2.1.0 Release: Website Integration Fix & optimized communication with Website"

git push && git push origin v2.1.0