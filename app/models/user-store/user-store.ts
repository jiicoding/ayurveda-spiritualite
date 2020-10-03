import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { UserModel, UserSnapshot, User } from "../user/user"
import { withEnvironment } from "../extensions"

/**
 * Model description here for TypeScript hints.
 */
export const UserStoreModel = types
  .model("UserStore")
  .props({
    user: types.optional(UserModel, {}),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveUser: (userSnapshot: UserSnapshot) => {
      const userModel: User = UserModel.create(userSnapshot)
      self.user = userModel
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  // .actions((self) => ({
  //   getUser: flow(function* (user_id) {
  //     const result: GetUserResult = yield self.environment.api.getUser(user_id)
  //     if (result.kind === "ok") {
  //       self.saveUser(result.user)
  //     } else {
  //       __DEV__ && console.tron.log(result.kind)
  //     }
  //   }),
  // }))
  // .actions((self) => ({
  //   setUser: flow(function* (user) {
  //     if (user) {
  //       if (user.name) self.user.name = user.name
  //       if (user.metrics) self.user.metrics = UserMetricsModel.create(user.metrics)
  //     } else {
  //       console.tron.error("missing user")
  //     }
  //   }),
  // }))
  .actions((self) => ({
    updateAuthState: flow(function* (user) {
      self.user.isLoggedIn = user && user.uid ? true : false
      if (user) {
        const { uid, displayName, email, emailVerified, photoURL, providerId } = user
        self.user.uid = uid
        self.user.displayName = displayName || undefined
        self.user.email = email || undefined
        self.user.emailVerified = emailVerified || undefined
        self.user.providerId = providerId || undefined
        self.user.photoURL = photoURL || undefined
      }
    }),
  }))
  .actions((self) => ({
    reset: flow(function* () {
      self.user = {} as User
    }),
  }))
  .actions((self) => ({
    setAction: (action: string) => {
      self.user.action = action
    },
  }))

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type UserStoreType = Instance<typeof UserStoreModel>
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
