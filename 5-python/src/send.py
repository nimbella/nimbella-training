from twilio.rest import Client
def main(args):
    sid = args["sid"]
    token = args["token"]
    number = args["number"]
    to = args["to"]
    body = args["body"]
    client = Client(sid, token)
    message = client.messages.create(from_=number,
        to=to, body=body)
    return { "result": message.status }
