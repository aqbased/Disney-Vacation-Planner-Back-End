curl 'http://localhost:4741/trips' \
  --include \
  --request POST \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "trip": {
      "name": "'"${NAME}"'",
      "dates": "'"${DATES}"'",
      "description": "'"${DESCRIPTION}"'"
    }
  }'

echo
