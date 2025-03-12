import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { getRequiredAuth } from "@/lib/auth-session";
import { headers } from "next/headers";

export default async function AuthPage() {
  const user = await getRequiredAuth();
  const accounts = await auth.api.listUserAccounts({
    headers: await headers(),
  });
  const sessions = await auth.api.listSessions({
    headers: await headers(),
  });

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Auth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              {user.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={user.image}
                  alt={user.name || "User"}
                  className="h-16 w-16 rounded-full"
                />
              )}
              <div>
                <h3 className="text-lg font-semibold">
                  {user.name || "Anonymous User"}
                </h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="border rounded-md p-3">
                <span className="text-muted-foreground">User ID:</span>
                <p className="font-mono mt-1 break-all">{user.id}</p>
              </div>
              {user.createdAt && (
                <div className="border rounded-md p-3">
                  <span className="text-muted-foreground">Joined:</span>
                  <p className="mt-1">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          {accounts.length === 0 ? (
            <p className="text-muted-foreground">No connected accounts</p>
          ) : (
            <div className="space-y-4">
              {accounts.map((account) => (
                <div key={account.id} className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{account.provider}</h3>
                    <span className="text-xs text-muted-foreground">
                      ID: {account.accountId}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Created:</span>{" "}
                      {new Date(account.createdAt).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Updated:</span>{" "}
                      {new Date(account.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                  {account.scopes.length > 0 && (
                    <div className="mt-2">
                      <span className="text-muted-foreground text-xs">
                        Scopes:
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {account.scopes.map((scope) => (
                          <span
                            key={scope}
                            className="bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full text-xs"
                          >
                            {scope}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Sessions</CardTitle>
        </CardHeader>
        <CardContent>
          {sessions.length === 0 ? (
            <p className="text-muted-foreground">No active sessions</p>
          ) : (
            <div className="space-y-4">
              {sessions.map((session) => (
                <div key={session.id} className="border rounded-md p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">
                      {session.userAgent || "Unknown Device"}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      IP: {session.ipAddress || "Unknown"}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Created:</span>{" "}
                      {new Date(session.createdAt).toLocaleDateString()}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Expires:</span>{" "}
                      {new Date(session.expiresAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
