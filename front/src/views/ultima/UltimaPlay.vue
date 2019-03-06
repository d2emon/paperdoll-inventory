<template>
  <v-card>
    <v-container class="main-screen">
      <v-layout
        row
        wrap
      >
        <v-flex xs12>
          <castle-map
            v-if="castleId"
          />
          <local-map
            v-else
          />
        </v-flex>
      </v-layout>
      <v-layout
        row
        wrap
      >
        <v-flex xs9>
          <v-card height="175px">
            <game-console />
          </v-card>
        </v-flex>
        <v-flex xs3>
          <v-card height="175px" class="main-screen">
            <character-summary />
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-card-actions>
      <v-layout
        row
        wrap
      >
        <v-flex xs3>
          <h5>
            Move
          </h5>
          <v-container>
            <v-layout
              row
              wrap
            >
              <v-flex xs4 class="offset-xs4">
                <v-btn
                  icon
                  @click="goDirection('North')"
                >
                  N
                </v-btn>
              </v-flex>
            </v-layout>
            <v-layout
              row
              wrap
            >
              <v-flex xs4>
                <v-btn
                  icon
                  @click="goDirection('West')"
                >
                  W
                </v-btn>
              </v-flex>
              <v-flex xs4 class="offset-xs4">
                <v-btn
                  icon
                  @click="goDirection('East')"
                >
                  E
                </v-btn>
              </v-flex>
            </v-layout>
            <v-layout
              row
              wrap
            >
              <v-flex xs4 class="offset-xs4">
                <v-btn
                  icon
                  @click="goDirection('South')"
                >
                  S
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
        </v-flex>
        <v-flex xs3>
          <h5>
            <span class="hotkey">A</span>ttack
          </h5>
          <v-container>
            <v-layout
              row
              wrap
            >
              <v-flex xs4 class="offset-xs4">
                <v-btn
                  icon
                  @click="goDirection('North')"
                >
                  N
                </v-btn>
              </v-flex>
            </v-layout>
            <v-layout
              row
              wrap
            >
              <v-flex xs4>
                <v-btn
                  icon
                  @click="goDirection('West')"
                >
                  W
                </v-btn>
              </v-flex>
              <v-flex xs4 class="offset-xs4">
                <v-btn
                  icon
                  @click="goDirection('East')"
                >
                  E
                </v-btn>
              </v-flex>
            </v-layout>
            <v-layout
              row
              wrap
            >
              <v-flex xs4 class="offset-xs4">
                <v-btn
                  icon
                  @click="goDirection('South')"
                >
                  S
                </v-btn>
              </v-flex>
            </v-layout>
          </v-container>
          <p>
            Attempt to harm your opponent with the weapon you currently hold. Unless fighting in a dungeon, you must
            indicate an attack direction.
          </p>
        </v-flex>
        <v-flex xs3>
          B	Board	Mount a horse or board a raft, frigate, or other form of transportation. You must be standing on the object before boarding.
        </v-flex>
        <v-flex xs3>
          C	Cast	Cast a spell. You must first commit the intended spell to memory, using the Ready command.
        </v-flex>
        <v-flex xs3>
          D	Drop	Dispose of unwanted items while in a town or castle. Dropped items cannot be retrieved.
        </v-flex>
        <v-flex xs3>
          <h5>
            <span class="hotkey">E</span>nter
          </h5>
          <v-btn
            :disabled="!castle || !castle.id || inCastle"
            @click="enterCastle"
          >
            <span class="hotkey">E</span>nter
          </v-btn>
          <p>
            Enter a town, castle, dungeon, or other landmark. You must be standing on the entrance before entering.
          </p>
        </v-flex>
        <v-flex xs3>
          F	Fire	Discharge a weapon at a foe from a ship or other armed vehicle.
        </v-flex>
        <v-flex xs3>
          G	Get	Pick up adjacent items.
        </v-flex>
        <v-flex xs3>
          H Hyper Jump Enables you to travel to other stellar sectors at a speed faster than light. Available only in certain vehicles.
        </v-flex>
        <v-flex xs3>
          I Inform & Search Reveals the names of places and things that may be entered. Also permits detection of secret doors and passages in dungeons and may grant a view of your surroundings in future transport crafts.
        </v-flex>
        <v-flex xs3>
          K	Klimb Climb up or down ladders in dungeons. This command can lead to doom as easily as to fortune.
        </v-flex>
        <v-flex xs3>
          N	Noise	Toggles sound on and off.
        </v-flex>
        <v-flex xs3>
          0	Open	Reveals the contents of a coffin in a dungeon.
        </v-flex>
        <v-flex xs3>
          Q Quit (and save to disk)	Use this command to stop playing (from the outside world only) and save your progress to disk. You can resume the game from this point.
        </v-flex>
        <v-flex xs3>
          R	Ready	Equip yourself with a specific weapon, wear a selected suit of armor, or learn a magic spell. Must be performed prior to using an item.
        </v-flex>
        <v-flex xs3>
          S	Steal	Used to take items from the unwatched counters of shops and the dark caches in castles. Beware, for the guards frown on this behavior.
        </v-flex>
        <v-flex xs3>
          T Transact Conduct business with merchants or kings.
        </v-flex>
        <v-flex xs3>
          U	Unlock	Open cells in castles or chests in dungeons. Danger may follow.
        </v-flex>
        <v-flex xs3>
          V View Change Switches the view in future transport crafts between front and top perspectives.
        </v-flex>
        <v-flex xs3>
          <h5>
            <span class="hotkey">X</span>-it
          </h5>
          <v-btn
            :disabled="!inCastle"
            @click="exitCastle"
          >
            <span class="hotkey">X</span>-it
          </v-btn>
          <p>
            Leave behind or dismount your current transport and travel on foot.
          </p>
        </v-flex>
        <v-flex xs3>
          Z	Ztats	Displays your vital statistics, possessions, and spells. Also used to temporarily stop the passage of time in the game.
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
  import {
    mapState,
    mapActions
  } from 'vuex'

  export default {
    name: 'UltimaPlay',
    components: {
      CharacterSummary: () => import('@/components/ultima/CharacterSummary'),
      LocalMap: () => import('@/components/ultima/LocalMap'),
      CastleMap: () => import('@/components/ultima/CastleMap'),
      GameConsole: () => import('@/components/ultima/GameConsole')
    },
    data: () => ({
      inCastle: false
    }),
    computed: {
      ...mapState('pc', [
        'characterId',
        'position',
        'castleId'
      ]),
      ...mapState('view', [
        'location',
        'castle',
      ])
    },
    mounted () {
      if (!this.characterId) return this.$router.push('/ultima')

      this.fetchView(this.position)
      this.doCommand({ playerId: this.characterId })
    },
    methods: {
      ...mapActions('view', ['fetchView']),
      ...mapActions('gameConsole', ['doCommand']),
      goDirection (direction) {
        this.doCommand({
          playerId: this.characterId,
          command: 'Go',
          direction
        })
          .then(() => this.fetchView(this.position))
      },
      enterCastle () {
        this.doCommand({
          playerId: this.characterId,
          command: 'Enter',
          castle: this.location.castle
        })
          .then(() => { this.inCastle = true })
      },
      exitCastle () {
        this.doCommand({
          playerId: this.characterId,
          command: 'Exit',
          location: this.location.castle
        })
          .then(() => { this.inCastle = false })
      }
    }
  }
</script>

<style scoped>
  .hotkey {
    text-decoration: underline;
  }
  .main-screen {
    background-color: black;
    color: white;
  }
</style>
