interface RouteProps {
    key: string;
    to: string;
    label: string;
}

export const navs: Array<RouteProps> = [
    {
        key: 'about',
        to: '/about',
        label: 'About',
    },
    {
        key: 'explore',
        to: '/explore',
        label: 'Explore',
    },
    {
        key: 'buy',
        to: '/collection/TF00001',
        label: 'Buy',
    },
    {
        key: 'trade',
        to: '/trade',
        label: 'Trade',
    },
    // {
    //     key: 'stats',
    //     to: '/stats',
    //     label: 'Stats',
    // },
    {
        key: 'rewards',
        to: '/rewards',
        label: 'Rewards',
    },
    {
        key: 'resources',
        to: '/resources',
        label: 'Resources',
    },
    {
        key: 'brand',
        to: '/brand',
        label: 'Brand',
    },
    
]