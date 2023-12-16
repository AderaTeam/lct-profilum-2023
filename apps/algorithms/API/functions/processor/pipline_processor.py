def piplineProcessor(data, pipline: [callable]):
    if len(pipline):
        data2 = pipline[0](data)
        for i in pipline[1:]:
            data2 = i(data2)
        return data2
    return data
    