import { Form } from "@remix-run/react";
import React from "react";
import { ParritError } from "~/api/common/ParritError";
import { Button } from "./Button";
import { ButtonLink } from "./ButtonLink";

interface ProjectProps {
  projectName?: string;
  password?: string;
}

interface Strings {
  title: string;
  actionButton: string;
  linkButton: { href: string; text: string };
}

interface Props {
  submitting: boolean;
  error?: ParritError<ProjectProps>;
  strings: Strings;
}

export const ProjectForm: React.FC<Props> = ({
  submitting,
  error,
  strings,
}) => {
  return (
    <Form className="form login-form" method="post">
      <h2 className="form-label mb-4">{strings.title}</h2>

      <input
        className={error?.data.fields?.projectName ? "error" : ""}
        type="text"
        name="projectName"
        placeholder="Project Name"
        data-testid="projectName"
      />
      <div data-testid="project_name_error" className="error-message">
        {error?.data.fields?.projectName}
      </div>
      <input
        className={error?.data.fields?.password ? "error" : ""}
        type="password"
        name="password"
        placeholder="Password"
        data-testid="password"
      />
      <div data-testid="password_error" className="error-message">
        {error?.data.fields?.password}
      </div>
      <Button
        loading={submitting}
        className="button-green"
        type="submit"
        data-testid="submit"
      >
        {strings.actionButton}
      </Button>

      <ButtonLink
        disabled={submitting}
        className="button-blue"
        to={strings.linkButton.href}
        type="button"
        data-testid="change-form"
      >
        {strings.linkButton.text}
      </ButtonLink>
      <div data-testid="server_error" className="error-message">
        {error?.data.server}
      </div>
    </Form>
  );
};
