FROM hypriot/rpi-node:4.4.4-wheezy

ADD . .

# If you need npm, don't use a base tag
RUN npm install

EXPOSE 4000

CMD ["node", "app.js"]