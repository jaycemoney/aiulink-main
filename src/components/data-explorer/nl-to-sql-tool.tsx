"use client";

import { useState, useActionState } from "react";
import { useFormStatus } from "react-dom";
import { nlToSqlQuery, NlToSqlQueryInput } from "@/ai/flows/nl-to-sql-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Wand2, Copy, Check } from "lucide-react";

type FormState = {
  sqlQuery: string;
  error?: string;
};

const initialState: FormState = {
  sqlQuery: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      <Wand2 className="mr-2 h-4 w-4" />
      {pending ? "Finding..." : "Find Query"}
    </Button>
  );
}

export function NlToSqlTool({ queryHistory }: { queryHistory: string[] }) {
  const [copied, setCopied] = useState(false);
  const [formState, formAction] = useActionState<FormState, FormData>(
    async (prevState, formData) => {
      const naturalLanguageQuery = formData.get("naturalLanguageQuery") as string;
      const input: NlToSqlQueryInput = {
        naturalLanguageQuery,
        queryHistory,
      };
      try {
        const result = await nlToSqlQuery(input);
        return { sqlQuery: result.sqlQuery };
      } catch (e: any) {
        return { sqlQuery: "", error: e.message || "An unexpected error occurred." };
      }
    },
    initialState
  );

  const handleCopy = () => {
    if (formState.sqlQuery) {
      navigator.clipboard.writeText(formState.sqlQuery);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="text-accent" />
          Natural Language Query Finder
        </CardTitle>
        <CardDescription>
          Describe what you want to find in plain English, and we'll find the closest matching SQL query from your history.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nl-query">Your query</Label>
            <Input
              id="nl-query"
              name="naturalLanguageQuery"
              placeholder="e.g., 'show me all new users from last month'"
              required
            />
          </div>
          <SubmitButton />
        </form>

        {(formState.sqlQuery || formState.error) && (
          <div className="mt-6">
            <Label>Suggested SQL Query</Label>
            {formState.error ? (
                <div className="mt-2 rounded-md border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
                    <p className="font-semibold">Error</p>
                    <p>{formState.error}</p>
                </div>
            ) : (
                <div className="relative mt-2 rounded-md border bg-muted p-3 font-mono text-sm">
                <pre className="whitespace-pre-wrap break-all">{formState.sqlQuery}</pre>
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-7 w-7"
                    onClick={handleCopy}
                >
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                    <span className="sr-only">Copy</span>
                </Button>
                </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
