import { useMemo } from "react";
import { usePathname } from "next/navigation";

// Utilitas untuk membuat kapital pertama
const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const useCurrentRouteName = () => {
    const pathname = usePathname();

    const routeWithHash = useMemo(() => {
        const routes = {
            "/": "Home",
            "/contact": "Contact",
            "/connection": "Connection",
            "/debug":"Debug"
        } as const;

        // Tangani hash dinamis pada "/"
        const hashRoutes = {
            about: "About",
            service: "Service",
        } as const;

        if (!pathname) return null;

        const [basePath, hash] = pathname.split("#");

        // Tangani hash dinamis pada path "/"
        if (basePath === "/" && hash) {
            const hashRouteName = hashRoutes[hash as keyof typeof hashRoutes];
            return hashRouteName
                ? capitalizeFirstLetter(hashRouteName)
                : `Unknown Hash (${capitalizeFirstLetter(hash)})`;
        }

        // Tangani rute "/connection" secara dinamis
        if (basePath.startsWith("/connection")) {
            const pathSegments = basePath.split("/").filter(Boolean); // Memecah path menjadi segmen
            const lastSegment = pathSegments[pathSegments.length - 1].replace(/-/g, " "); // Ganti "-" dengan spasi
            const dynamicRouteName =
                pathSegments.length > 1
                    ? capitalizeFirstLetter(lastSegment)
                    : "Connection";
        
            return hash
                ? `${dynamicRouteName} (${capitalizeFirstLetter(hash)})`
                : dynamicRouteName;
        }
        

        // Periksa jika rute ada di `routes` secara statis
        if (basePath in routes) {
            const routeName = routes[basePath as keyof typeof routes];
            return hash
                ? `${capitalizeFirstLetter(routeName)} (${capitalizeFirstLetter(hash)})`
                : capitalizeFirstLetter(routeName);
        }

        return null;
    }, [pathname]);

    return routeWithHash;
};
