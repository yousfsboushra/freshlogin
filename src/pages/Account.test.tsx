import TestRenderer from "react-test-renderer";
import { MockedProvider } from "@apollo/client/testing";
import { ACCOUNT_QUERY } from "../api/queries";
import Account from "./Account";
import i18n from "../i18n.testing";
import { I18nextProvider } from "react-i18next";

const mocks = [
  {
    request: {
      query: ACCOUNT_QUERY,
      variables: {
        id: 9,
      },
    },
    result: {
      data: {
        user: { firstname: "Yousef", lastname: "Samir" },
      },
    },
  },
];

it("renders without error", () => {
  const component = TestRenderer.create(
    <MockedProvider mocks={mocks} addTypename={false}>
      <I18nextProvider i18n={i18n}>
        <Account />
      </I18nextProvider>
    </MockedProvider>
  );
  const h1 = component.root.findByType("h1");
  expect(h1.children.join("")).toContain("Account");
});
