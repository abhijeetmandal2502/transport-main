export default async function handler(req, res) {

    // res.status(200).json({ message: req.body })
    // res.status(422).json({ message: req.method })

    if (req.method == 'POST') {

        const response = await fetch(`https://transport-backend.thenwg.xyz/api/vehicle-assign`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                amount: req.body.amount,
                booking_id: req.body.booking_id,
                driver_id: req.body.driver_id,
                vehicle_id: req.body.vehicle_id
            }),
        });

        const data = response.json();
        if (data.status === 'success') {
            res.status(200).json({ message: data.message })
        }
        else {
            res.status(422).json({ message: data.errors })
        }

    }
    else {

    }
}

