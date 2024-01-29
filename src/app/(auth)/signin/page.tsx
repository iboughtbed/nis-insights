import { OAuthSignIn } from "~/components/auth/oauth-signin";
import { Shell } from "~/components/shells/shell";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export default function SignInPage() {
  return (
    <Shell className="max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign In</CardTitle>
          <CardDescription>
            Choose your preferred sign in method
          </CardDescription>
        </CardHeader>
        <CardContent>
          <OAuthSignIn />
        </CardContent>
      </Card>
    </Shell>
  );
}
