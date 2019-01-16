const now = () => (typeof performance !== 'undefined' && !!performance.now ? performance.now() : Date.now());
const RESET_INTERVAL = 3 * 60 * 1000;
export class FabricPerformance {
    static measure(name, func) {
        if (FabricPerformance._timeoutId) {
            FabricPerformance.setPeriodicReset();
        }
        const start = now();
        func();
        const end = now();
        const measurement = FabricPerformance.summary[name] || {
            totalDuration: 0,
            count: 0,
            all: []
        };
        const duration = end - start;
        measurement.totalDuration += duration;
        measurement.count++;
        measurement.all.push({
            duration: duration,
            timeStamp: end
        });
        FabricPerformance.summary[name] = measurement;
    }
    static reset() {
        FabricPerformance.summary = {};
        clearTimeout(FabricPerformance._timeoutId);
        FabricPerformance._timeoutId = NaN;
    }
    static setPeriodicReset() {
        FabricPerformance._timeoutId = setTimeout(() => FabricPerformance.reset(), RESET_INTERVAL);
    }
}
FabricPerformance.summary = {};
