# usectl uses a Dockerfile in the repo as-is instead of generating one.
# This one only swaps in our nginx.conf (real 404s, one address per page).
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html
RUN rm -f /usr/share/nginx/html/Dockerfile /usr/share/nginx/html/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
