import { api } from "@/lib/api";
import { Technology, TechnologyFilters } from "@/types/technologies";

export const getTechnologies = async (filter: TechnologyFilters) => {
    const result = await api.get<Technology[]>("/", { params: filter, timeout: 5000 })
    return result?.data;
} 