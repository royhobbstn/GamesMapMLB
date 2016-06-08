FROM hypriot/rpi-node:latest

ADD . .

# If you need npm, don't use a base tag
RUN npm install

EXPOSE 4000

CMD ["node", "app.js"]