import {Outlet} from 'react-router-dom';

import { MainNavigation } from "./MainNavigation";

export function RootLayout() {
    return (
        <main>
            <MainNavigation />
            <Outlet />
        </main>
    )
}