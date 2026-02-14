n=int( input("entrez un nombre : "))
z=n
a=0
b=1
while n!=0:
    if z==n:
        print("1 ",end="")
    else:
        c=a+b
        a=b
        b=c
        print(str(c) + " ", end="")
    n=n-1

