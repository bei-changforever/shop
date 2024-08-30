
export function startTime() {
    let date = new Date()
    let mm = date.getMonth() + 1 as any
    let dd = date.getDate() as any
    mm = mm < 10 ? '0' + mm : mm
    dd = dd < 10 ? '0' + dd : dd

    return {
        mm,
        dd
    }
}