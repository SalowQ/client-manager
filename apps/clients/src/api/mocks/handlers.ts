import { http, HttpResponse } from "msw";

export const handlers = [
  http.get("https://boasorte.teddybackoffice.com.br/users", ({ request }) => {
    const url = new URL(request.url);
    const page = url.searchParams.get("page") || "1";

    return HttpResponse.json({
      clients: [
        {
          id: 3,
          name: "joão silva",
          salary: 5000,
          companyValuation: 34242.34,
          createdAt: "2025-07-06T16:08:53.778Z",
          updatedAt: "2025-07-06T17:04:01.179Z",
        },
        {
          id: 4,
          name: "maria",
          salary: 3242.53,
          companyValuation: 43534.54,
          createdAt: "2025-07-06T16:40:08.462Z",
          updatedAt: "2025-07-06T16:40:08.462Z",
        },
        {
          id: 6,
          name: "samantha",
          salary: 4353.45,
          companyValuation: 543543.56,
          createdAt: "2025-07-06T16:40:29.205Z",
          updatedAt: "2025-07-06T16:40:29.205Z",
        },
        {
          id: 7,
          name: "sherlock",
          salary: 45344.35,
          companyValuation: 435534.53,
          createdAt: "2025-07-06T16:40:42.368Z",
          updatedAt: "2025-07-06T16:40:42.368Z",
        },
        {
          id: 8,
          name: "watson",
          salary: 6675.66,
          companyValuation: 54656.46,
          createdAt: "2025-07-06T16:40:52.597Z",
          updatedAt: "2025-07-06T16:40:52.597Z",
        },
        {
          id: 9,
          name: "arthur",
          salary: 5877.88,
          companyValuation: 567464.54,
          createdAt: "2025-07-06T16:41:03.898Z",
          updatedAt: "2025-07-06T16:41:03.898Z",
        },
        {
          id: 10,
          name: "jim",
          salary: 7456.35,
          companyValuation: 543454.58,
          createdAt: "2025-07-06T16:41:23.381Z",
          updatedAt: "2025-07-06T17:08:06.520Z",
        },
        {
          id: 11,
          name: "paulinho",
          salary: 4534.43,
          companyValuation: 345345.35,
          createdAt: "2025-07-06T17:04:31.387Z",
          updatedAt: "2025-07-06T17:15:10.452Z",
        },
        {
          id: 12,
          name: "John Doe",
          salary: 5000,
          companyValuation: 500000,
          createdAt: "2025-07-07T11:23:17.416Z",
          updatedAt: "2025-07-07T11:23:17.416Z",
        },
      ],
      totalPages: 1,
      currentPage: parseInt(page),
    });
  }),
];
