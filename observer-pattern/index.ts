type Callback<Argument> = (argument: Argument) => void;

// export class Topic<Message> {
//   subscribers: Set<Callback<Message>> = new Set();
//   subscribe(callback: Callback<Message>): () => void {
//     this.subscribers.add(callback);
//     return () => this.subscribers.delete(callback);
//   }

//   publish(message: Message): void {
//     for (const callback of this.subscribers) {
//       callback(message);
//     }
//   }
// }

export const createTopic = <Message>() => {
  const subscribers: Set<Callback<Message>> = new Set();

  const subscribe = (callback: Callback<Message>): (() => void) => {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  };

  const publish = (message: Message): void => {
    for (const callback of subscribers) {
      callback(message);
    }
  };

  return { publish, subscribe };
};
