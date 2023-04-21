export default function date(request, response) {
  const date = new Date();
  if (request.method == "GET") {
    return response.status(200).json(date);
  }
}
