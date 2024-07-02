"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "@repo/ui";

function KindLogout() {
  return (
    <LogoutLink>
      <Button size={"lg"}>Logout</Button>
    </LogoutLink>
  );
}

export default KindLogout;
