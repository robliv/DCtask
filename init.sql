USE dc_task;
CREATE TABLE IF NOT EXISTS access_log (
    request_timestamp TIMESTAMP NOT NULL,
    ip_address VARCHAR(15) NOT NULL,
    method VARCHAR(10) NOT NULL,
    path VARCHAR(255) NOT NULL,
    user_agent VARCHAR(255) NOT NULL
);
