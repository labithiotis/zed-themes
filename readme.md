## Zed Themes

Welcome to zed themes, a place to create, share and explore themes for the zed code editor.

It's still very early days for this project, but I'm excited to see where it goes. If you have any ideas or suggestions, please feel free to open an issue or pull request.

So of the tokens are still a work in progress, zed seems to have more tokens than currently used in the theme file. I will be adding more tokens as I find out what they are used for.

## Installing new themes

1. Download the `theme.json` from zed-themes.com
2. Move `theme.json` to `~/.config/zed/themes`
3. Enjoy your new Zed theme.

## Contributing

If you have any ideas or suggestions, please feel free to open an issue or pull request.

## Running the project locally

Prerequisites:
- Node.js 20+
- pnpm
- [Clerk](https://github.com/clerkinc/clerk) dev keys

1. Clone the repo
2. Run `pnpm install`
3. Create `.dev.vars` from `.dev.vars.example` and add your clerk dev keys
4. Run `pnpm dev`
5. Run `pnpm db:seed` that will create the database and seed it with some data
6. Open `http://localhost:3000` in your browser

#### Todo

- [ ] Add social links for sharing a theme
- [ ] Share on twitter/linkedin
- [ ] Highlight each part of the IDE as you hover over token?
