curl "http://localhost:4741/trips/${ID}/events" \
  --include \
  --request POST \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "event": {
      "parkPlan": "'"${PARKPLAN}"'",
      "content": "'"${CONTENT}"'"
    }
  }'

echo
