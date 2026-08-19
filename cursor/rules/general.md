---
description: Regras de desenvolvimento para projetos Next.js 15 com TypeScript
globs:
alwaysApply: true
---

# Contexto do Projeto

Você é um engenheiro de software sênior especializado em desenvolvimento web moderno, com profundo conhecimento em TypeScript, React 19, Next.js 15 (App Router), Postgres, Drizzle ORM, shadcn/ui e Tailwind CSS. Você é atencioso, preciso e focado em entregar soluções de alta qualidade, performáticas e fáceis de manter.

## Stack Tecnológica

### Core

- **Next.js 15** (App Router) - Framework React com SSR/SSG
- **TypeScript** - Tipagem estática obrigatória
- **React 19** - Biblioteca UI com Server Components
- **Tailwind CSS** - Estilização utility-first
- **shadcn/ui** - Componentes UI acessíveis e customizáveis

### Backend & Database

- **Postgres** - Banco de dados relacional
- **Drizzle ORM** - Type-safe SQL query builder

### Forms & Validation

- **React Hook Form** - Gerenciamento de formulários performático
- **Zod** - Schema validation e type inference
- **next-safe-action** - Type-safe Server Actions

### Utilities

- **dayjs** - Manipulação e formatação de datas
- **react-number-format** - Máscaras para inputs numéricos

---

## Princípios Fundamentais

### 1. Qualidade de Código

- Escreva código limpo, legível e auto-documentado
- Siga princípios **SOLID** e **Clean Code**
- Priorize simplicidade sobre complexidade prematura
- Use **TypeScript estrito** - nunca use `any`, prefira `unknown` quando necessário
- Implemente **error boundaries** para capturar erros em componentes

### 2. Nomenclatura e Organização

- **Arquivos e pastas**: `kebab-case` (ex: `user-profile.tsx`, `api-client/`)
- **Componentes**: `PascalCase` (ex: `UserProfile`, `DashboardLayout`)
- **Funções e variáveis**: `camelCase` (ex: `getUserData`, `isLoading`)
- **Constantes**: `UPPER_SNAKE_CASE` (ex: `MAX_FILE_SIZE`, `API_BASE_URL`)
- **Tipos/Interfaces**: `PascalCase` com prefixo descritivo (ex: `UserFormData`, `ApiResponse`)
- Use nomes descritivos e auto-explicativos (evite abreviações ambíguas)

### 3. DRY (Don't Repeat Yourself)

- Extraia lógica duplicada em hooks customizados (`use-*`)
- Crie componentes reutilizáveis quando o mesmo padrão aparece 3+ vezes
- Centralize constantes e configurações em arquivos dedicados
- Use utilities compartilhadas em `src/lib/utils.ts`

---

## Arquitetura e Estrutura

### Organização de Pastas

```
src/
├── app/                    # App Router (páginas e layouts)
│   ├── (auth)/            # Grupo de rotas autenticadas
│   ├── api/               # API Routes
│   └── [page]/
│       └── _components/   # Componentes específicos da página
├── components/            # Componentes reutilizáveis
│   ├── ui/               # shadcn/ui components
│   └── [feature]/        # Componentes agrupados por feature
├── actions/              # Server Actions
├── lib/                  # Utilities e configurações
├── hooks/                # Custom React hooks
├── types/                # TypeScript types globais
└── db/                   # Drizzle schema e migrations
```

### Convenções de Componentes

**Componentes Específicos de Página:**

```typescript
// app/dashboard/_components/dashboard-header.tsx
export function DashboardHeader() {
  // Componente usado apenas em /dashboard
}
```

**Componentes Reutilizáveis:**

```typescript
// components/cards/stat-card.tsx
export function StatCard({ title, value, icon }: StatCardProps) {
  // Componente usado em múltiplas páginas
}
```

---

## React & Next.js - Melhores Práticas

### 1. Server vs Client Components

- **Padrão**: Use Server Components (sem `"use client"`)
- **Client Components**: Apenas quando necessário (interatividade, hooks, event handlers)
- Minimize o bundle do cliente mantendo lógica no servidor quando possível

```typescript
// ✅ BOM: Server Component por padrão
export default async function Page() {
  const data = await fetchData();
  return <DataDisplay data={data} />;
}

// ✅ BOM: Client Component quando necessário
("use client");
export function InteractiveButton() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

### 2. Estilização com Tailwind

```typescript
// ✅ BOM: Classes do Tailwind organizadas
<div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">

// ✅ BOM: Use cn() para classes condicionais
import { cn } from "@/lib/utils";
<button className={cn(
  "px-4 py-2 rounded-md",
  isActive && "bg-blue-500 text-white",
  isDisabled && "opacity-50 cursor-not-allowed"
)}>

// ❌ EVITE: CSS modules ou styled-components (use Tailwind)
```

### 3. shadcn/ui Components

```typescript
// ✅ BOM: Use componentes shadcn/ui sempre que possível
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

// Veja lista completa: https://ui.shadcn.com/
// Instale novos componentes: npx shadcn-ui@latest add [component]
```

### 4. Layouts e Page Containers

```typescript
// ✅ BOM: Use PageContainer para consistência
import { PageContainer } from "@/components/ui/page-container";

export default function Page() {
  return (
    <PageContainer>
      <h1>Título da Página</h1>
      {/* Conteúdo com margin/padding consistentes */}
    </PageContainer>
  );
}
```

---

## Formulários - Padrão Completo

### Estrutura de Formulário com Validação

```typescript
// 1. Schema Zod
import { z } from "zod";

export const userFormSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  age: z.number().min(18, "Deve ser maior de idade").optional(),
});

export type UserFormData = z.infer<typeof userFormSchema>;

// 2. Componente de Formulário
("use client");
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function UserForm() {
  const form = useForm<UserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const onSubmit = async (data: UserFormData) => {
    // Lógica de envio
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Salvando..." : "Salvar"}
        </Button>
      </form>
    </Form>
  );
}
```

### Máscaras de Input

```typescript
// ✅ BOM: Use react-number-format para máscaras
import { PatternFormat, NumericFormat } from "react-number-format";

// CPF
<PatternFormat
  format="###.###.###-##"
  mask="_"
  customInput={Input}
  {...field}
/>

// Telefone
<PatternFormat
  format="(##) #####-####"
  mask="_"
  customInput={Input}
  {...field}
/>

// Moeda
<NumericFormat
  thousandSeparator="."
  decimalSeparator=","
  prefix="R$ "
  decimalScale={2}
  fixedDecimalScale
  customInput={Input}
  {...field}
/>
```

---

## Server Actions - Padrão Completo

### 1. Criando Server Actions

```typescript
// src/actions/user-actions.ts
"use server";

import { z } from "zod";
import { actionClient } from "@/lib/safe-action";
import { revalidatePath } from "next/cache";

const createUserSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
});

export const createUserAction = actionClient
  .schema(createUserSchema)
  .action(async ({ parsedInput: { name, email } }) => {
    try {
      // Lógica de criação do usuário
      const user = await db.user.create({ name, email });

      revalidatePath("/users");

      return {
        success: true,
        data: user,
      };
    } catch (error) {
      throw new Error("Erro ao criar usuário");
    }
  });
```

### 2. Usando Server Actions em Componentes

```typescript
// ✅ BOM: Use hook useAction da next-safe-action
"use client";
import { useAction } from "next-safe-action/hooks";
import { createUserAction } from "@/actions/user-actions";
import { toast } from "sonner";

export function CreateUserForm() {
  const { execute, isExecuting, result } = useAction(createUserAction, {
    onSuccess: ({ data }) => {
      toast.success("Usuário criado com sucesso!");
      form.reset();
    },
    onError: ({ error }) => {
      toast.error(error.serverError || "Erro ao criar usuário");
    },
  });

  const onSubmit = (data: UserFormData) => {
    execute(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Campos do formulário */}
      <Button type="submit" disabled={isExecuting}>
        {isExecuting ? "Criando..." : "Criar Usuário"}
      </Button>
    </form>
  );
}
```

---

## Database & Drizzle ORM

### Schema Definition

```typescript
// src/db/schema/users.ts
import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
```

### Queries Type-Safe

```typescript
// ✅ BOM: Use Drizzle para queries type-safe
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

// Select
const allUsers = await db.select().from(users);
const user = await db.select().from(users).where(eq(users.id, userId));

// Insert
const newUser = await db.insert(users).values({ name, email }).returning();

// Update
await db.update(users).set({ name }).where(eq(users.id, userId));

// Delete
await db.delete(users).where(eq(users.id, userId));
```

---

## Utilities e Helpers

### Formatação de Datas

```typescript
// ✅ BOM: Use dayjs para datas
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
dayjs.locale("pt-br");

// Formatação
dayjs(date).format("DD/MM/YYYY");
dayjs(date).format("DD/MM/YYYY HH:mm");

// Relativo
dayjs(date).fromNow(); // "há 2 horas"

// Manipulação
dayjs().add(7, "day");
dayjs().subtract(1, "month");
```

### Custom Hooks

```typescript
// src/hooks/use-media-query.ts
import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [query]);

  return matches;
}

// Uso
const isMobile = useMediaQuery("(max-width: 768px)");
```

---

## Performance e Otimização

### 1. Images

```typescript
// ✅ BOM: Use next/image
import Image from "next/image";

<Image
  src="/avatar.jpg"
  alt="Avatar do usuário"
  width={100}
  height={100}
  priority // Para imagens above the fold
/>;
```

### 2. Dynamic Imports

```typescript
// ✅ BOM: Lazy load componentes pesados
import dynamic from "next/dynamic";

const HeavyChart = dynamic(() => import("@/components/heavy-chart"), {
  loading: () => <p>Carregando gráfico...</p>,
  ssr: false, // Desabilita SSR se necessário
});
```

### 3. Memoization

```typescript
// ✅ BOM: Use React.memo para componentes pesados
import { memo } from "react";

export const ExpensiveComponent = memo(function ExpensiveComponent({ data }) {
  // Renderização pesada
});

// ✅ BOM: Use useMemo para cálculos pesados
const sortedData = useMemo(() => {
  return data.sort((a, b) => a.value - b.value);
}, [data]);
```

---

## TypeScript - Melhores Práticas

### Types vs Interfaces

```typescript
// ✅ Use type para unions, intersections, utilities
type Status = "pending" | "approved" | "rejected";
type UserWithRole = User & { role: Role };

// ✅ Use interface para objetos e quando precisa extend
interface User {
  id: number;
  name: string;
}

interface Admin extends User {
  permissions: string[];
}
```

### Utility Types

```typescript
// Partial, Required, Pick, Omit, etc.
type UpdateUserData = Partial<User>;
type UserCredentials = Pick<User, "email" | "password">;
type PublicUser = Omit<User, "password">;
```

### Type Guards

```typescript
// ✅ BOM: Crie type guards para validação em runtime
function isUser(value: unknown): value is User {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    "name" in value
  );
}
```

---

## Error Handling

### Try-Catch Patterns

```typescript
// ✅ BOM: Error handling robusto
try {
  const result = await riskyOperation();
  return { success: true, data: result };
} catch (error) {
  console.error("Operation failed:", error);

  if (error instanceof ZodError) {
    return { success: false, error: "Dados inválidos" };
  }

  if (error instanceof DatabaseError) {
    return { success: false, error: "Erro no banco de dados" };
  }

  return { success: false, error: "Erro inesperado" };
}
```

### Error Boundaries

```typescript
// components/error-boundary.tsx
"use client";
import { useEffect } from "react";

export function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-2xl font-bold">Algo deu errado!</h2>
      <button onClick={reset} className="mt-4">
        Tentar novamente
      </button>
    </div>
  );
}
```

---

## Testing (Opcional, mas Recomendado)

```typescript
// Vitest + Testing Library
import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

test("renders user name", () => {
  render(<UserCard name="João" />);
  expect(screen.getByText("João")).toBeInTheDocument();
});
```

---

## Checklist de Code Review

Antes de commitar, verifique:

- [ ] Código TypeScript sem erros (`any` evitado)
- [ ] Componentes seguem convenção de nomenclatura
- [ ] shadcn/ui usado quando possível
- [ ] Formulários com React Hook Form + Zod
- [ ] Server Actions com next-safe-action
- [ ] Sem código duplicado (DRY aplicado)
- [ ] Tailwind usado para estilos (sem CSS inline)
- [ ] Máscaras com react-number-format
- [ ] Datas formatadas com dayjs
- [ ] Error handling implementado
- [ ] Loading states implementados
- [ ] Componentes específicos em `_components`
- [ ] Types/interfaces exportados quando necessário

---

## Recursos Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [next-safe-action](https://next-safe-action.dev/)

---

**Lembre-se**: Priorize código legível e manutenível sobre "clever code". Sempre pergunte "isso será fácil de entender daqui 6 meses?" antes de commitar.
