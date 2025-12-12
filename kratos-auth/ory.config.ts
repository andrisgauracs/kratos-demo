// Copyright © 2024 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import type { OryClientConfiguration } from "@ory/elements-react";

const config: OryClientConfiguration = {
  project: {
    default_locale: "en",
    default_redirect_url: "/",
    error_ui_url: "/error",
    locale_behavior: "force_default",
    name: "Ory Authentication Example",
    registration_enabled: true,
    verification_enabled: true,
    recovery_enabled: true,
    registration_ui_url: "/register",
    verification_ui_url: "/verification",
    recovery_ui_url: "/recovery",
    login_ui_url: "/login",
    settings_ui_url: "/settings",
  },
};

export default config;
