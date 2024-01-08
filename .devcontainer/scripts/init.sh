#/bin/bash

sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.5/zsh-in-docker.sh)" -- \
  -p git \
  -p ssh-agent \
  -p yarn \
  -p gatsby \
  -p https://github.com/zsh-users/zsh-autosuggestions \
  -p https://github.com/zsh-users/zsh-completions \
  -p https://github.com/zsh-users/zsh-syntax-highlighting \
  -x

sh -c "corepack enable"

sh -c "yarn global add gatsby-cli"

sh -c "yarn install"

sh -c "git config --global init.defaultBranch main"

cat << EOF >> ~/.zshrc

# set PATH so it includes user's yarn global bin if it exists
if [ -d "\$HOME/.yarn/bin" ] ; then
  PATH="\$(yarn global bin):\$PATH"
fi
EOF

sh -c "mkdir -p ~/.config/gatsby"

cat << EOF >> ~/.config/gatsby/config.json
{
  "cli": {
    "packageManager": "yarn",
  }
}
EOF
