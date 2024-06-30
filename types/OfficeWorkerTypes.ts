export type OffiiceWorkers = {
    _id?: number,
    worker_name: string,
    address: string,
    city: string,
    zip_code?: number,
    mobile_number: string,
    job_code: number,
    work_start_date: Date,
    personal_id: number,
    client_hours: object,
    home_number?: string,
    password: string
}