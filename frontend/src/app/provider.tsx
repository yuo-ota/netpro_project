'use client';

import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import { GpsProvider } from '@/components/GpsContext';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '@/components/AuthProvider';

import type { ReactElement } from 'react';

type ProviderProps = {
    children: ReactElement;
};

const Provider: React.FC<ProviderProps> = ({ children }) => {
    return (
        <ChakraProvider value={defaultSystem}>
            <ThemeProvider attribute="class" disableTransitionOnChange>
                <GpsProvider>
                    <BrowserRouter>
                        <AuthProvider>{children}</AuthProvider>
                    </BrowserRouter>
                </GpsProvider>
            </ThemeProvider>
        </ChakraProvider>
    );
};

export default Provider;
