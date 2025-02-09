# Rendu RealTimeEloRanker Noa Jacquet

Lien GIT : https://github.com/NoaJacquet/realtime-elo-ranker

## Implémentation des Contrôleurs, Services et Modules

Dans ce projet, l’architecture de l’application repose sur une séparation claire des responsabilités entre les contrôleurs, services et modules, conformément aux bonnes pratiques de NestJS.

### 1. Les Controlleurs

Les contrôleurs dans NestJS sont responsables de la gestion des requêtes HTTP et de l'envoi des réponses. Ils agissent comme une interface entre l'application et les utilisateurs ou d'autres systèmes via les API.

#### Exemple de Contrôleur : PlayersController

Le contrôleur PlayersController est chargé de la gestion des joueurs. Il contient des routes comme POST /api/player, permettant la création d'un joueur. Ce contrôleur fait appel au service PlayerService pour la logique métier, et assure le lien entre la demande utilisateur et l'exécution du service.

```ts
@Controller()
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post('api/player')
  async create(@Body() player: Player) {
    return this.playersService.create(player);
  }
}
```
### 2. Les Services

Les services sont responsables de la logique métier. Ils contiennent la logique des opérations comme la création, la mise à jour ou la suppression d’entités. Les services agissent comme des points de gestion des données de l'application.

#### Exemple de Service : PlayerService

Le service PlayerService gère les opérations liées aux joueurs. Par exemple, dans la méthode create(), le service crée un joueur et l'ajoute à une liste interne. Il émet également un événement via l’EventEmitterService pour notifier de la mise à jour du classement.

```ts
@Injectable()
export class PlayersService {
  private readonly players: Player[] = [];

  constructor(private readonly eventEmitter: EventEmitterService) {}

  create(player: Player): Player {
    player.rank = 1000; // Initialisation du rang
    this.players.push(player);
    this.eventEmitter.emit('ranking.update', player); // Émission de l'événement
    return player;
  }

  findAll(): Player[] {
    return this.players;
  }
}
```

### 3. Les Modules

Les modules sont responsables de l'organisation des fonctionnalités de l'application. Ils regroupent les services, contrôleurs, et autres composants associés. Chaque module est indépendant, ce qui favorise la modularité et la réutilisabilité du code.

#### Exemple de Module : PlayerModule

Le module PlayerModule regroupe le service PlayerService et le contrôleur PlayerController. Il est utilisé pour organiser la gestion des joueurs de manière isolée, en lui attribuant des responsabilités précises. Le module importe également d'autres modules si nécessaire, comme l'EventEmitterModule pour émettre des événements.

```ts
@Module({
  imports: [EventEmitterModule],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule {}
```

## EventEmitter

Dans ce projet, j'ai implémenté un système d'événements en temps réel en utilisant le module EventEmitter de NestJS. Cela permet de diffuser des événements à travers l'application, et de réagir à ces événements en temps réel, comme dans le cas de la mise à jour du classement des joueurs.


### 1. Creation du Service EventEmitterService

Le service EventEmitterService est responsable de l'émission des événements. Il utilise l'instance de EventEmitter2 fournie par nestjs/event-emitter. Le service expose deux méthodes principales :

- getEventEmitter(): Permet de récupérer l'émetteur d'événements.
- emit(): Permet d'émettre un événement avec un payload.

```ts
@Injectable()
export class EventEmitterService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  getEventEmitter(): EventEmitter2 {
    return this.eventEmitter;
  }

  emit(event: string, payload: any) {
    this.eventEmitter.emit(event, payload);
  }
}
```
### 2. Envois d'Événements dans le Service PlayerService

Dans le service PlayersService, chaque fois qu'un joueur est créé via la méthode create(), un événement ranking.update est émis avec les informations du joueur.

```ts
@Injectable()
export class PlayersService {
  private readonly players: Player[] = [];

  constructor(private readonly eventEmitter: EventEmitterService) {}

  create(player: Player) {
    this.players.push(player);
    this.eventEmitter.emit('ranking.update', player);
  }

  findAll(): Player[] {
    return this.players;
  }
}
```
### 3. Écoute d'Événements dans le Contrôleur RankingController

Dans RankingController, j'ai créé un endpoint SSE (/api/ranking/events) qui écoute les événements d'update du classement via l'EventEmitter. Lorsqu'un événement ranking.update est émis, il est capté par ce contrôleur et transformé en un événement MessageEvent, prêt à être envoyé au client : 

```ts
@Get('api/ranking/events')
@Sse()
getRankingEvents(): Observable<MessageEvent> {
  return fromEvent(this.eventEmitter.getEventEmitter(), 'ranking.update').pipe(
    map((player: Player) => {
      return <MessageEvent> {
        data: JSON.stringify({
          type: 'RankingUpdate',
          player: player,
        })
      }
    })
  );
}
```

## Tests

Dans ce projet, des tests ont été écrits pour garantir le bon fonctionnement des services et des contrôleurs, en utilisant des tests unitaires et des tests E2E.

Vous pouvez lancez les tests en vous rendant dans le dossier realtime-elo-ranker-server : 

```bash
cd apps/realtime-elo-ranker-server
```

Puis :

```bash
npm test
```

### Tests Unitaires :

Pour chaque service, j'ai utilisé Jest pour écrire des tests unitaires. Par exemple, dans le service PlayersService, j'ai testé la méthode de création d'un joueur :

```ts
it('should create a player', async () => {
  const player: Player = { id: '1', name: 'Player 1', rank: 1500 };
  const result = await playersService.create(player);
  expect(result).toEqual(player);
});
```

### Tests E2E :

Les tests E2E vérifient l'intégration entre les différentes parties de l'application. J'ai utilisé Supertest pour envoyer des requêtes HTTP à notre API.

Voici un exemple pour tester la création d'un joueur via l'API :

```ts
it('/api/player (POST) should create a player and return the player object', () => {
  const newPlayer: Player = { id: '1', name: 'Player 1', rank: 1500 };

  return request(app.getHttpServer())
    .post('/api/player')
    .send(newPlayer)
    .expect(201)
    .expect({ id: '1', name: 'Player 1', rank: 1500 });
});
```