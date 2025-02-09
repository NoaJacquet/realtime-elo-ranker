"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchService = void 0;
const common_1 = require("@nestjs/common");
const ranking_service_1 = require("../ranking/ranking.service");
const event_emitter_1 = require("@nestjs/event-emitter");
let MatchService = class MatchService {
    constructor(RankingService, eventEmitter) {
        this.RankingService = RankingService;
        this.eventEmitter = eventEmitter;
    }
    async getPlayerById(id) {
        const players = this.RankingService.getRanking();
        return players.find(player => player.id === id);
    }
    async setMatch(match) {
        const player1 = await this.getPlayerById(match.winner);
        const player2 = await this.getPlayerById(match.loser);
        if (!player1 || !player2) {
            throw new Error("Joueur introuvable");
        }
        const K = 32;
        const expectedScore1 = 1 / (1 + Math.pow(10, (player2.rank - player1.rank) / 400));
        const expectedScore2 = 1 - expectedScore1;
        player1.rank += K * (1 - expectedScore1);
        player2.rank += K * (0 - expectedScore2);
        this.eventEmitter.emit('match.updated', { winner: player1, loser: player2 });
        return {
            winner: {
                id: player1.id,
                rank: Math.round(player1.rank),
            },
            loser: {
                id: player2.id,
                rank: Math.round(player2.rank),
            },
        };
    }
};
exports.MatchService = MatchService;
exports.MatchService = MatchService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [ranking_service_1.RankingService, typeof (_a = typeof event_emitter_1.EventEmitter2 !== "undefined" && event_emitter_1.EventEmitter2) === "function" ? _a : Object])
], MatchService);
//# sourceMappingURL=match.service.js.map