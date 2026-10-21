# CI Metrics

## Setup
- Commit: `9c6189e`
- Runner: ubuntu-latest, Node 22
- Browser: chromium (headless)
- Execution: serial (no parallel workers)
- Date: Oct 20, 2026

## Baseline (3 serial runs)

| Run | Scenario | Steps | Cucumber time | Browser install | Job total |
|-----|----------|-------|---------------|-----------------|-----------|
| #11 | 6/6 | 35/35 | 18.253s | 17s | 54s |
| #12 | 6/6 | 35/35 | 16.690s | 18s | 45s |
| #13 | 6/6 | 35/35 | 14.239s | 25s | 62s |

**Average Job total:** 53.67s   
**Average Cucumber time:** 16.394s  
**Average Browser install:** 20s  
**Pass rate:** 100% (18/18 scenario runs)

## Notes
- Cucumber time varied between 14.2s and 18.3s across 3 runs.
- Browser install time depends on the GitHub runner's download speed.
- Browser install was ~38% of the average job time, so caching it is the first optimization target.