import { Email, columns } from "./columns"
import { DataTable } from "./data-table"

async function getData(): Promise<Email[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      website: "https://google.com",
      email: "m@example.com",
    },
    {
        id: "728ed52f",
        amount: 100,
        website: "pending",
        email: "a@example.com",
    },
        {
      id: "728ed52f",
      amount: 100,
      website: "pending",
      email: "v@example.com",
    },
    {
        id: "728ed52f",
        amount: 100,
        website: "b@example.com",
        email: "b@example.com",
    },
    {
        id: "728ed52f",
        amount: 100,
        website: "pending",
        email: "c@example.com",
      },
      {
          id: "728ed52f",
          amount: 100,
          website: "pending",
          email: "q@example.com",
      },
          {
        id: "728ed52f",
        amount: 100,
        website: "pending",
        email: "m@example.com",
      },
      {
          id: "728ed52f",
          amount: 100,
          website: "pending",
          email: "m@example.com",
      },
      {
        id: "728ed52f",
        amount: 100,
        website: "pending",
        email: "m@example.com",
      },
      {
          id: "728ed52f",
          amount: 100,
          website: "pending",
          email: "m@example.com",
      },
          {
        id: "728ed52f",
        amount: 100,
        website: "pending",
        email: "m@example.com",
      },
      {
          id: "728ed52f",
          amount: 100,
          website: "pending",
          email: "m@example.com",
      },

    
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
