import { type NextPage } from "next";
import { useState } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import { Table } from "../components/Table";
import { Wrapper } from "../components/Wrapper";

import { trpc, type RouterInputs } from "../utils/trpc";

type EmployeeCreateInput = RouterInputs["employee"]["create"];
type Label<T> = {
  [key in keyof T]: string;
};

const labels: Label<EmployeeCreateInput> = {
  firstName: "First Name",
  lastName: "Last Name",
  team: "Team",
};

const initialData: EmployeeCreateInput = {
  firstName: "",
  lastName: "",
  team: "Lit",
};

const Home: NextPage = () => {
  const [input, setInput] = useState(initialData);

  const { data: employees } = trpc.employee.getAll.useQuery();

  const utils = trpc.useContext();
  const { mutate } = trpc.employee.create.useMutation({
    onSuccess: () => {
      utils.employee.invalidate();
      setInput(initialData);
    },
  });

  return (
    <Wrapper>
      <div className="flex gap-8">
        <Input
          key="firstName"
          label={labels["firstName"]}
          value={input["firstName"]}
          onChange={(event) =>
            setInput((input) => ({ ...input, firstName: event.target.value }))
          }
        />
        <Input
          key="lastName"
          label={labels["lastName"]}
          value={input["lastName"]}
          onChange={(event) =>
            setInput((input) => ({ ...input, lastName: event.target.value }))
          }
        />
        <Select
          key="team"
          label={labels["team"]}
          value={input["team"]}
          options={["Lit", "Prettier"]}
          onChange={(event) =>
            setInput((input) => ({
              ...input,
              team: event.target.value as EmployeeCreateInput["team"],
            }))
          }
        />
      </div>

      <Button onClick={() => mutate(input)} label={"Add Employee"} />

      <Table
        labels={labels}
        rows={employees}
        title={"Employees"}
        description={"All our employees"}
      />
    </Wrapper>
  );
};

export default Home;
