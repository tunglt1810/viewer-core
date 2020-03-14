export default function makeCancelable(thenable) {
    let isCanceled = false;
    const promise = Promise.resolve(thenable).then(
        (result) => {
            if (isCanceled) throw Object.freeze({ isCanceled });
            return result;
        },
        (error) => {
            if (isCanceled) throw Object.freeze({ isCanceled, error });
            throw error;
        }
    );
    return Object.assign(Object.create(promise), {
        then: promise.then.bind(promise),
        cancel() {
            isCanceled = true;
        }
    });
}
