export interface Percentiles {
  p50: number 
  p90: number
  p95: number
  p99: number  
}

export type PercentilesNamed = { name: string, type: string, value: number }
export type PercentilesRecord = Record<string, Percentiles>

export interface KbfTaskManagerHealth {
  id: string
  timestamp: string
  status: string
  last_update: string
  stats: {
    configuration: KbfTaskManagerHealthStats
    runtime: KbfTaskManagerHealthRuntime
    workload: KbfTaskManagerHealthWorkload
    capacity_estimation: KbfTaskManagerHealthCapacity
  }
}

interface KbfTaskManagerHealthStats {
  timestamp: string
  status: string
  value: {
    request_capacity: number
    max_poll_inactivity_cycles: number
    monitored_aggregated_stats_refresh_rate: number
    monitored_stats_running_average_window: number
    monitored_task_execution_thresholds: {
      default: { error_threshold: number, warn_threshold: number }
      custom: {}
    },
    poll_interval: number
    max_workers: number
  }
}

interface KbfTaskManagerHealthRuntime {
  timestamp: string
  status: string
  value: {
    polling: {
      last_successful_poll: string
      last_polling_delay: string
      claim_duration: Percentiles
      duration: Percentiles

      claim_conflicts: Percentiles
      claim_mismatches: Percentiles
      result_frequency_percent_as_number: {
        Failed: number
        NoAvailableWorkers: number
        NoTasksClaimed: number
        RanOutOfCapacity: number
        RunningAtCapacity: number
        PoolFilled: number
      }

      persistence: { recurring: number, non_recurring: number }
    }
    drift: Percentiles
    drift_by_type: {
      [key: string]: Percentiles
    }
    load: Percentiles
    execution: {
      duration: {
        [key: string]: Percentiles
      }
      duration_by_persistence: {
        recurring: Percentiles
        non_recurring: Percentiles
      }
      persistence: {
        recurring: number
        non_recurring: number
        ephemeral: number
      }
      result_frequency_percent_as_number: {
        [key: string]: {
          Success: number
          Failed: number
          RetryScheduled: number
          status: string
        }
      }
    }
  }
}

interface KbfTaskManagerHealthWorkload {
  timestamp: string
  status: string
  value: {
    count: number
    task_types: {
      [key: string]: {
        count: number
        status: {
          idle?: number
          running?: number
          failed?: number
          claiming?: number
        }
      }
    }
    non_recurring: number
    owner_ids: number
    schedule: [string, number][]
    overdue: number
    overdue_non_recurring: number
    estimated_schedule_density: number[]
    capacity_requirements: {
      per_minute: number
      per_hour: number
      per_day: number
    }      
  }
}

interface KbfTaskManagerHealthCapacity {
  timestamp: string
  status: string
  value: {
    observed: {
      observed_kibana_instances: number
      max_throughput_per_minute_per_kibana: number
      max_throughput_per_minute: number
      minutes_to_drain_overdue: number
      avg_recurring_required_throughput_per_minute: number
      avg_recurring_required_throughput_per_minute_per_kibana: number
      avg_required_throughput_per_minute: number
      avg_required_throughput_per_minute_per_kibana: number
    }
    proposed: {
      provisioned_kibana: number
      min_required_kibana: number
      avg_recurring_required_throughput_per_minute_per_kibana: number
      avg_required_throughput_per_minute_per_kibana: number
    }
  }
}

// copy of the relevant file from the diagnostics bundle, for type checking
const TaskManagerHealth: KbfTaskManagerHealth = {
  "id": "537c0cfe-f21f-431a-abfd-af3fb2dc6721",
  "timestamp": "2023-05-27T14:33:57.366Z",
  "status": "error",
  "last_update": "2023-05-27T14:33:57.131Z",
  "stats": {
    "configuration": {
      "timestamp": "2023-01-12T15:00:31.352Z",
      "value": {
        "request_capacity": 1000,
        "max_poll_inactivity_cycles": 10,
        "monitored_aggregated_stats_refresh_rate": 60000,
        "monitored_stats_running_average_window": 50,
        "monitored_task_execution_thresholds": {
          "default": { "error_threshold": 90, "warn_threshold": 80 },
          "custom": {}
        },
        "poll_interval": 3000,
        "max_workers": 10
      },
      "status": "OK"
    },
    "runtime": {
      "timestamp": "2023-05-27T14:33:57.130Z",
      "value": {
        "polling": {
          "last_successful_poll": "2023-05-27T14:33:55.946Z",
          "last_polling_delay": "2023-05-17T13:30:27.529Z",
          "claim_duration": { "p50": 26, "p90": 79, "p95": 171, "p99": 1280 },
          "duration": { "p50": 58, "p90": 87, "p95": 178, "p99": 1303 },
          "claim_conflicts": { "p50": 0, "p90": 0, "p95": 0, "p99": 0 },
          "claim_mismatches": { "p50": 0, "p90": 0, "p95": 0, "p99": 0 },
          "result_frequency_percent_as_number": {
            "Failed": 0,
            "NoAvailableWorkers": 0,
            "NoTasksClaimed": 0,
            "RanOutOfCapacity": 50,
            "RunningAtCapacity": 50,
            "PoolFilled": 0
          },
          "persistence": { "recurring": 100, "non_recurring": 0 }
        },
        "drift": { "p50": 7246, "p90": 8699.5, "p95": 9258, "p99": 9258 },
        "drift_by_type": {
          "fleet:check-deleted-files-task": {
            "p50": 7583,
            "p90": 7700,
            "p95": 7831,
            "p99": 7928
          },
          "osquery:telemetry-packs": {
            "p50": 7586.5,
            "p90": 7800,
            "p95": 7931,
            "p99": 12295
          },
          "osquery:telemetry-saved-queries": {
            "p50": 7575,
            "p90": 7810,
            "p95": 7930,
            "p99": 8056
          },
          "osquery:telemetry-configs": {
            "p50": 7571.5,
            "p90": 7758.5,
            "p95": 7909,
            "p99": 7988
          },
          "alerts_invalidate_api_keys": {
            "p50": 6028.5,
            "p90": 6056.5,
            "p95": 6065,
            "p99": 6071
          },
          "cleanup_failed_action_executions": {
            "p50": 6205,
            "p90": 6233.5,
            "p95": 6247,
            "p99": 6271
          },
          "alerting_health_check": {
            "p50": 6204,
            "p90": 6231.5,
            "p95": 6239,
            "p99": 6288
          },
          "Fleet-Usage-Logger": {
            "p50": 6059,
            "p90": 6088.5,
            "p95": 6098,
            "p99": 6179
          },
          "Fleet-Usage-Sender": {
            "p50": 6200.5,
            "p90": 6233,
            "p95": 6243,
            "p99": 6282
          },
          "cases-telemetry-task": {
            "p50": 5292,
            "p90": 5434.5,
            "p95": 5766,
            "p99": 6928
          },
          "endpoint:metadata-check-transforms-task": {
            "p50": 6389,
            "p90": 6430.5,
            "p95": 6448,
            "p99": 6516
          },
          "security:endpoint-diagnostics": {
            "p50": 6027.5,
            "p90": 6057.5,
            "p95": 6071,
            "p99": 6312
          },
          "security:endpoint-meta-telemetry": {
            "p50": 7577.5,
            "p90": 7750,
            "p95": 7909,
            "p99": 8014
          },
          "security:telemetry-timelines": {
            "p50": 6577,
            "p90": 6658.5,
            "p95": 6714,
            "p99": 6878
          },
          "security:telemetry-configuration": {
            "p50": 6204.5,
            "p90": 6237.5,
            "p95": 6252,
            "p99": 9247
          },
          "security:telemetry-prebuilt-rule-alerts": {
            "p50": 6204.5,
            "p90": 6246,
            "p95": 6262,
            "p99": 6418
          },
          "security:telemetry-filterlist-artifact": {
            "p50": 6151.5,
            "p90": 6185,
            "p95": 6191,
            "p99": 6205
          },
          "security:telemetry-detection-rules": {
            "p50": 7579.5,
            "p90": 7813,
            "p95": 7937,
            "p99": 9311
          },
          "apm-telemetry-task": {
            "p50": 5296,
            "p90": 5438.5,
            "p95": 5699,
            "p99": 6952
          },
          "security:telemetry-lists": {
            "p50": 7579.5,
            "p90": 7813,
            "p95": 7937,
            "p99": 9312
          },
          "reports:monitor": {
            "p50": 6018,
            "p90": 6032,
            "p95": 6052,
            "p99": 6095
          },
          "endpoint:user-artifact-packager": {
            "p50": 5985.5,
            "p90": 6011.5,
            "p95": 6058,
            "p99": 7233
          },
          "alerting_telemetry": {
            "p50": 6664,
            "p90": 7862,
            "p95": 8268,
            "p99": 17590
          },
          "actions_telemetry": {
            "p50": 6663.5,
            "p90": 7862,
            "p95": 8267,
            "p99": 17590
          },
          "dashboard_telemetry": {
            "p50": 6663.5,
            "p90": 7861.5,
            "p95": 8267,
            "p99": 14589
          },
          "session_cleanup": {
            "p50": 6203,
            "p90": 6232.5,
            "p95": 6246,
            "p99": 6321
          },
          "UPTIME:SyntheticsService:Sync-Saved-Monitor-Objects": {
            "p50": 6031.5,
            "p90": 6062,
            "p95": 6096,
            "p99": 6408
          },
          "ML:saved-objects-sync": {
            "p50": 6198.5,
            "p90": 6243,
            "p95": 6290,
            "p99": 6404
          },
          "alerting:.index-threshold": {
            "p50": 8004,
            "p90": 8699.5,
            "p95": 9258,
            "p99": 9258
          },
          "actions:.server-log": {
            "p50": 20312,
            "p90": 20497,
            "p95": 20499,
            "p99": 20499
          },
          "actions:.email": {
            "p50": 19094.5,
            "p90": 23362,
            "p95": 23363,
            "p99": 23363
          },
          "report:execute": {
            "p50": 2892,
            "p90": 4333,
            "p95": 4333,
            "p99": 4333
          },
          "alerting:.es-query": {
            "p50": 6016.5,
            "p90": 6043.5,
            "p95": 6085,
            "p99": 7263
          },
          "alerting:siem.queryRule": {
            "p50": 8007,
            "p90": 8032.5,
            "p95": 8068,
            "p99": 8249
          },
          "alerting:metrics.alert.threshold": {
            "p50": 6013,
            "p90": 6053.5,
            "p95": 6068,
            "p99": 7259
          }
        },
        "load": { "p50": 100, "p90": 100, "p95": 100, "p99": 100 },
        "execution": {
          "duration": {
            "fleet:check-deleted-files-task": {
              "p50": 16,
              "p90": 21,
              "p95": 23,
              "p99": 40
            },
            "osquery:telemetry-packs": {
              "p50": 17,
              "p90": 24,
              "p95": 26,
              "p99": 30
            },
            "osquery:telemetry-saved-queries": {
              "p50": 18.5,
              "p90": 26,
              "p95": 44,
              "p99": 193
            },
            "osquery:telemetry-configs": {
              "p50": 20,
              "p90": 30,
              "p95": 33,
              "p99": 54
            },
            "alerts_invalidate_api_keys": {
              "p50": 22.5,
              "p90": 28,
              "p95": 44,
              "p99": 70
            },
            "cleanup_failed_action_executions": {
              "p50": 23,
              "p90": 27,
              "p95": 28,
              "p99": 42
            },
            "alerting_health_check": {
              "p50": 67.5,
              "p90": 111.5,
              "p95": 121,
              "p99": 137
            },
            "Fleet-Usage-Logger": {
              "p50": 262.5,
              "p90": 344.5,
              "p95": 446,
              "p99": 634
            },
            "Fleet-Usage-Sender": {
              "p50": 471.5,
              "p90": 631.5,
              "p95": 644,
              "p99": 798
            },
            "cases-telemetry-task": {
              "p50": 767,
              "p90": 1109.5,
              "p95": 1131,
              "p99": 1207
            },
            "endpoint:metadata-check-transforms-task": {
              "p50": 27.5,
              "p90": 41.5,
              "p95": 50,
              "p99": 72
            },
            "security:endpoint-diagnostics": {
              "p50": 451,
              "p90": 528.5,
              "p95": 578,
              "p99": 1138
            },
            "security:endpoint-meta-telemetry": {
              "p50": 476.5,
              "p90": 627,
              "p95": 658,
              "p99": 721
            },
            "security:telemetry-timelines": {
              "p50": 492,
              "p90": 638.5,
              "p95": 725,
              "p99": 832
            },
            "security:telemetry-configuration": {
              "p50": 567.5,
              "p90": 709,
              "p95": 762,
              "p99": 791
            },
            "security:telemetry-prebuilt-rule-alerts": {
              "p50": 467.5,
              "p90": 618.5,
              "p95": 671,
              "p99": 716
            },
            "security:telemetry-filterlist-artifact": {
              "p50": 570,
              "p90": 700,
              "p95": 747,
              "p99": 818
            },
            "security:telemetry-detection-rules": {
              "p50": 477,
              "p90": 605.5,
              "p95": 641,
              "p99": 692
            },
            "apm-telemetry-task": {
              "p50": 1106.5,
              "p90": 1477.5,
              "p95": 1570,
              "p99": 1634
            },
            "security:telemetry-lists": {
              "p50": 722.5,
              "p90": 958,
              "p95": 1057,
              "p99": 1173
            },
            "reports:monitor": {
              "p50": 18.5,
              "p90": 23.5,
              "p95": 25,
              "p99": 30
            },
            "endpoint:user-artifact-packager": {
              "p50": 17,
              "p90": 23,
              "p95": 42,
              "p99": 131
            },
            "alerting_telemetry": {
              "p50": 7282,
              "p90": 7587.5,
              "p95": 7680,
              "p99": 7701
            },
            "actions_telemetry": {
              "p50": 153.5,
              "p90": 201.5,
              "p95": 298,
              "p99": 2553
            },
            "dashboard_telemetry": {
              "p50": 57.5,
              "p90": 91.5,
              "p95": 114,
              "p99": 186
            },
            "session_cleanup": {
              "p50": 26.5,
              "p90": 39.5,
              "p95": 44,
              "p99": 61
            },
            "UPTIME:SyntheticsService:Sync-Saved-Monitor-Objects": {
              "p50": 463,
              "p90": 795.5,
              "p95": 826,
              "p99": 904
            },
            "ML:saved-objects-sync": {
              "p50": 44.5,
              "p90": 77.5,
              "p95": 88,
              "p99": 566
            },
            "alerting:.index-threshold": {
              "p50": 401.5,
              "p90": 588.5,
              "p95": 902,
              "p99": 917
            },
            "actions:.server-log": {
              "p50": 177,
              "p90": 235,
              "p95": 251,
              "p99": 265
            },
            "actions:.email": {
              "p50": 542,
              "p90": 780.5,
              "p95": 1598.5,
              "p99": 1621
            },
            "report:execute": {
              "p50": 742,
              "p90": 763,
              "p95": 763,
              "p99": 763
            },
            "alerting:.es-query": {
              "p50": 389,
              "p90": 571,
              "p95": 604,
              "p99": 692
            },
            "alerting:siem.queryRule": {
              "p50": 1958.5,
              "p90": 2339,
              "p95": 2391,
              "p99": 3459
            },
            "alerting:metrics.alert.threshold": {
              "p50": 457,
              "p90": 610.5,
              "p95": 626,
              "p99": 661
            }
          },
          "duration_by_persistence": {
            "recurring": { "p50": 405, "p90": 899, "p95": 917, "p99": 3459 },
            "non_recurring": {
              "p50": 152.5,
              "p90": 7334,
              "p95": 7571,
              "p99": 7688
            }
          },
          "persistence": {
            "recurring": 100,
            "non_recurring": 0,
            "ephemeral": 0
          },
          "result_frequency_percent_as_number": {
            "fleet:check-deleted-files-task": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "osquery:telemetry-packs": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "osquery:telemetry-saved-queries": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "osquery:telemetry-configs": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "alerts_invalidate_api_keys": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "cleanup_failed_action_executions": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "alerting_health_check": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "Fleet-Usage-Logger": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "Fleet-Usage-Sender": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "cases-telemetry-task": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "endpoint:metadata-check-transforms-task": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "security:endpoint-diagnostics": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "security:endpoint-meta-telemetry": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "security:telemetry-timelines": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "security:telemetry-configuration": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "security:telemetry-prebuilt-rule-alerts": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "security:telemetry-filterlist-artifact": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "security:telemetry-detection-rules": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "apm-telemetry-task": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "security:telemetry-lists": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "reports:monitor": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "endpoint:user-artifact-packager": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "alerting_telemetry": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "actions_telemetry": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "dashboard_telemetry": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "session_cleanup": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "UPTIME:SyntheticsService:Sync-Saved-Monitor-Objects": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "ML:saved-objects-sync": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "alerting:.index-threshold": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "actions:.server-log": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "actions:.email": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "report:execute": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "alerting:.es-query": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "alerting:siem.queryRule": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            },
            "alerting:metrics.alert.threshold": {
              "Success": 100,
              "RetryScheduled": 0,
              "Failed": 0,
              "status": "OK"
            }
          }
        }
      },
      "status": "OK"
    },
    "workload": {
      "timestamp": "2023-05-27T14:33:56.446Z",
      "value": {
        "count": 53,
        "task_types": {
          "alerting:.index-threshold": {
            "count": 22,
            "status": { "idle": 10, "running": 7, "claiming": 5 }
          },
          "Fleet-Usage-Logger": { "count": 1, "status": { "idle": 1 } },
          "Fleet-Usage-Sender": { "count": 1, "status": { "idle": 1 } },
          "ML:saved-objects-sync": { "count": 1, "status": { "idle": 1 } },
          "UPTIME:SyntheticsService:Sync-Saved-Monitor-Objects": {
            "count": 1,
            "status": { "idle": 1 }
          },
          "actions_telemetry": { "count": 1, "status": { "idle": 1 } },
          "alerting:.es-query": { "count": 1, "status": { "idle": 1 } },
          "alerting:metrics.alert.threshold": {
            "count": 1,
            "status": { "idle": 1 }
          },
          "alerting:siem.queryRule": { "count": 1, "status": { "running": 1 } },
          "alerting_health_check": { "count": 1, "status": { "idle": 1 } },
          "alerting_telemetry": { "count": 1, "status": { "idle": 1 } },
          "alerts_invalidate_api_keys": { "count": 1, "status": { "idle": 1 } },
          "apm-telemetry-task": { "count": 1, "status": { "idle": 1 } },
          "cases-telemetry-task": { "count": 1, "status": { "idle": 1 } },
          "cleanup_failed_action_executions": {
            "count": 1,
            "status": { "idle": 1 }
          },
          "dashboard_telemetry": { "count": 1, "status": { "idle": 1 } },
          "endpoint:metadata-check-transforms-task": {
            "count": 1,
            "status": { "idle": 1 }
          },
          "endpoint:user-artifact-packager": {
            "count": 1,
            "status": { "idle": 1 }
          },
          "fleet:check-deleted-files-task": {
            "count": 1,
            "status": { "idle": 1 }
          },
          "osquery:telemetry-configs": { "count": 1, "status": { "idle": 1 } },
          "osquery:telemetry-packs": { "count": 1, "status": { "idle": 1 } },
          "osquery:telemetry-saved-queries": {
            "count": 1,
            "status": { "idle": 1 }
          },
          "reports:monitor": { "count": 1, "status": { "idle": 1 } },
          "security:endpoint-diagnostics": {
            "count": 1,
            "status": { "running": 1 }
          },
          "security:endpoint-meta-telemetry": {
            "count": 1,
            "status": { "idle": 1 }
          },
          "security:telemetry-configuration": {
            "count": 1,
            "status": { "idle": 1 }
          },
          "security:telemetry-detection-rules": {
            "count": 1,
            "status": { "idle": 1 }
          },
          "security:telemetry-filterlist-artifact": {
            "count": 1,
            "status": { "idle": 1 }
          },
          "security:telemetry-lists": { "count": 1, "status": { "idle": 1 } },
          "security:telemetry-prebuilt-rule-alerts": {
            "count": 1,
            "status": { "idle": 1 }
          },
          "security:telemetry-timelines": {
            "count": 1,
            "status": { "idle": 1 }
          },
          "session_cleanup": { "count": 1, "status": { "idle": 1 } }
        },
        "non_recurring": 53,
        "owner_ids": 1,
        "schedule": [
          ["1s", 22],
          ["3s", 3],
          ["1m", 1],
          ["60s", 1],
          ["5m", 3],
          ["15m", 1],
          ["45m", 1],
          ["1h", 4],
          ["60m", 2],
          ["3600s", 1],
          ["2h", 1],
          ["3h", 1],
          ["720m", 2],
          ["24h", 6],
          ["1d", 1]
        ],
        "overdue": 10,
        "overdue_non_recurring": 10,
        "estimated_schedule_density": [
          2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 4, 2, 2, 2,
          2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 2, 2, 2, 4
        ],
        "capacity_requirements": {
          "per_minute": 1382,
          "per_hour": 48,
          "per_day": 31
        }
      },
      "status": "OK"
    },
    "capacity_estimation": {
      "status": "error",
      "timestamp": "2023-05-27T14:33:57.366Z",
      "value": {
        "observed": {
          "observed_kibana_instances": 1,
          "max_throughput_per_minute_per_kibana": 200,
          "max_throughput_per_minute": 200,
          "minutes_to_drain_overdue": 10,
          "avg_recurring_required_throughput_per_minute": 1383,
          "avg_recurring_required_throughput_per_minute_per_kibana": 1383,
          "avg_required_throughput_per_minute": 1383,
          "avg_required_throughput_per_minute_per_kibana": 1383
        },
        "proposed": {
          "provisioned_kibana": 9,
          "min_required_kibana": 7,
          "avg_recurring_required_throughput_per_minute_per_kibana": 154,
          "avg_required_throughput_per_minute_per_kibana": 154
        }
      }
    }
  }
}

