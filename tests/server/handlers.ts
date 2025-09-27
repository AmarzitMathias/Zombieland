import { http, HttpResponse } from "msw";

export const handlers = [
    http.delete("http://localhost:3101/api/account/delete", (req, res, ctx) => {
        return HttpResponse.json({message: "test accompli"})
    }),
    http.post("http://localhost:3101/api/registration", (req, res, ctx) => {
        return HttpResponse.json({ lastname: 'b', firstname: 'f', email: 'f', password: 'f' })
    }),
];
