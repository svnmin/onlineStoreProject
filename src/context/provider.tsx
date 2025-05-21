"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React, { ReactNode, useState } from "react"


interface ReactQueryProviderProps{
    children : ReactNode;
}

export const ReactQueryProvider : React.FC<ReactQueryProviderProps> = ({children}) => {
    const [queryClient] = useState(() => new QueryClient());

    return(
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}