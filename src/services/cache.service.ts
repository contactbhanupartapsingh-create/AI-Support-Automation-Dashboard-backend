import { Cache, CACHE_MANAGER } from "@nestjs/cache-manager";
import { Inject, Injectable } from "@nestjs/common";
import { generateCacheKey } from "src/common/functions";
import { CacheKeyDeleteProperties, CacheKeyProperties } from "src/common/interface";
import { TicketResponseDto } from "src/dto/getTicketResponse.dto";

@Injectable()
export class CacheService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    async validateResponse(properties: CacheKeyProperties) : Promise<TicketResponseDto | undefined> {
        const {
            userId,
            paginationQuery,
            filters,
            sortFilters
        } = properties

        const cacheKey = generateCacheKey(
            userId,
            paginationQuery,
            filters,
            sortFilters
        )

        const cachedResponse: TicketResponseDto | undefined = await this.cacheManager.get(cacheKey)
        return cachedResponse
    }

    async invalidateTickets(properties: CacheKeyDeleteProperties) {
        const store = (this.cacheManager as any).store;

        // 2. Access the internal Redis client (usually under store.client or store.instance)
        const client = store?.client || store?.instance;

        if (!client) {
            console.error('Redis client not found in cache store');
            return;
        }

        const { userId } = properties
        const pattern = `tickets:u:${userId}:*`;
        let cursor = '0'; // SCAN cursor must be a string in many Redis clients
        const keysToDelete: string[] = [];

        do {
            const [newCursor, keys] = await client.scan(cursor, 'MATCH', pattern, 'COUNT', 100);
            cursor = newCursor;
            keysToDelete.push(...keys);
        } while (cursor !== '0');

        // 4. Delete if keys were found
        if (keysToDelete.length > 0) {
            await client.del(keysToDelete);
            console.log(`Successfully cleared ${keysToDelete.length} cached views for user ${userId}`);
        }
    }

}