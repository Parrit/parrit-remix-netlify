import HeaderStyles from "~/styles/header.css";

import { Form, Link } from "@remix-run/react";

export function links() {
  return [{ rel: "stylesheet", href: HeaderStyles }];
}

export default function Header() {
  return (
    <header>
      <div className="header-logo"></div>
      <div className="links">
        <Form method="delete" action="/signout" navigate={false}>
          <button className="logout" name="logout">
            LOGOUT
          </button>
        </Form>
        <Link className="" to="https://goo.gl/forms/ZGqUyZDEDSWqZVBP2">
          Feedback
        </Link>
      </div>
    </header>
  );
}
